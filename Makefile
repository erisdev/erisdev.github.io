TWEE2_PRODUCT := index.html
TWEE2_FILES := twine/workshop.tw2

.PHONY : default clean

default : $(TWEE2_PRODUCT)

clean :
	rm -f $(TWEE2_PRODUCT)

$(TWEE2_PRODUCT) : $(TWEE2_FILES)
	twee2 build $< $@
